/**
 * Normalize payload for tambah driver massal (bulk driver creation)
 * @param {Object} formData - Form data from the driver form
 * @returns {Object} - Normalized payload for API
 */
export const normalizePayloadTambahDriverMassal = (formData) => {
  const { driverList } = formData;
  console.log(driverList);
  return {
    drivers: driverList.map((driver) => {
      const documents = [];
      driver.ktpPhoto &&
        documents.push({
          documentType: "KTP",
          documentUrl: driver.ktpPhoto.documentUrl,
          documentName: driver.ktpPhoto.name,
        });
      driver.simB2Photo &&
        documents.push({
          documentType: "SIM_B2_UMUM",
          documentUrl: driver.simB2Photo.documentUrl,
          documentName: driver.simB2Photo.name,
        });
      return {
        name: driver.fullName,
        phoneNumber: driver.whatsappNumber,
        photos: driver.driverImage
          ? [
              {
                photoType: "PROFILE",
                photoUrl: driver.driverImage.fileUrl,
                photoName: driver.driverImage.fileName,
              },
            ]
          : [],
        documents: documents,
        simExpiryDate: driver.simB2ExpiryDate,
      };
    }),
  };
};
