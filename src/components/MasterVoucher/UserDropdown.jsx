"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useGetVoucherUsers } from "@/services/mastervoucher/getVoucherUsers";

import MultiSelectDropdown from "@/components/MultiSelectDropdown/MultiSelectDropdown";

const UserDropdown = ({
  selectedItems = [],
  onSelectionChange,
  placeholder = "Pilih User",
  titleModal = "User (No. WhatsApp)",
  errorMessage,
  disabled = false,
  showAllOption = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollRef = useRef(null);
  const debounceRef = useRef(null);
  const previousSearchRef = useRef("");

  const useFetcherMuatrans = true; // Set to false as requested

  // Debounce search query
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce delay

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery]);

  // API params using debounced search query
  const params = useMemo(
    () => ({
      search: debouncedSearchQuery.length >= 3 ? debouncedSearchQuery : undefined,
      page: currentPage,
      limit: 100,
    }),
    [debouncedSearchQuery, currentPage]
  );

  const { data, error, isLoading } = useGetVoucherUsers(
    params,
    useFetcherMuatrans
  );

  // Transform users to options format
  const transformUsersToOptions = (users) => {
    return users.map((user) => ({
      value: user.id,
      label: user.phoneNumber,
      fullName: user.fullName,
      email: user.email,
      id: user.id,
    }));
  };

  useEffect(() => {
    if (data?.Data?.users) {
      const newUsers = transformUsersToOptions(data.Data.users);
      if (currentPage === 1) {
        // First page or new search - replace all users
        setAllUsers(newUsers);
      } else {
        // Subsequent pages - append to existing users
        setAllUsers((prev) => [...prev, ...newUsers]);
      }
      setIsLoadingMore(false);
    }
  }, [data, currentPage]);

  // Reset pagination when debounced search changes
  useEffect(() => {
    const isSearching = debouncedSearchQuery.length >= 3;
    const wasSearching = previousSearchRef.current.length >= 3;
    
    // Reset page when search changes
    setCurrentPage(1);
    
    // Clear users when:
    // 1. Starting a new search (from empty or different search)
    // 2. NOT when going back from search to empty (keep showing fresh data from API)
    if (isSearching && previousSearchRef.current !== debouncedSearchQuery) {
      setAllUsers([]);
    }
    
    previousSearchRef.current = debouncedSearchQuery;
  }, [debouncedSearchQuery]);

  // Handle search with immediate UI update
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle scroll to load more data
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (
      isNearBottom &&
      !isLoading &&
      !isLoadingMore &&
      data?.Data?.pagination?.page < data?.Data?.pagination?.totalPages
    ) {
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Custom MultiSelectDropdown with search and infinite scroll
  const customProps = {
    options: allUsers,
    selectedItems,
    onSelectionChange,
    placeholder,
    titleModal,
    errorMessage,
    disabled,
    showAllOption,
    searchable: true,
    onSearch: handleSearch,
    searchPlaceholder: "Pilih User",
    loading: isLoading && currentPage === 1,
    loadingMore: isLoadingMore,
    onScroll: handleScroll,
    error: error,
    useAllSpecialValue: true, // Enable special "all" behavior for users
  };

  return <MultiSelectDropdown {...customProps} />;
};

export default UserDropdown;
