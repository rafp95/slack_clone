export enum SessionStorageOperations {
  CURRENT_CHANNEL = "CURRENT_CHANNEL",
}

export const setStorage = (
  sessionOperation: SessionStorageOperations,
  data: object
) => {
  sessionStorage.setItem(sessionOperation, JSON.stringify(data));
};

export const getStorage = <T>(sessionOperation: SessionStorageOperations) =>
  JSON.parse(sessionStorage.getItem(sessionOperation) ?? "") as T;
