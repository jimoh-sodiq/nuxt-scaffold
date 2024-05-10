/**
 * creates a new directory
 * @param parentHandle
 * @param name
 */
async function createDirectory(parentHandle: any, name: string) {
  const createdDirectoryHandle = await parentHandle.getDirectoryHandle(name, {
    create: true,
  });
  return createdDirectoryHandle;
}

/**
 * Creates a new file in the directory with handle specified
 * @param directoryHandle
 * @param fileName
 * @param fileContent
 */
async function createFile(
  directoryHandle: any,
  fileName: string,
  fileContent?: string
) {
  const fileHandle = await directoryHandle.getFileHandle(fileName, {
    create: true,
  });
  if (fileContent) {
    await writeFile(fileHandle, fileContent);
  }
  return fileHandle;
}

type FileWithContent = {
  name: string;
  content?: string;
};

/**
 * creates a directory with multiple files passed in as FileWithContent array in fileOptions
 * @param parentHandle
 * @param directoryName
 * @param fileOptions
 */
async function createDirectoryWithMultipleFiles(
  parentHandle: any,
  directoryName: string,
  fileOptions: Array<FileWithContent>
) {
  const directoryHandle = await createDirectory(parentHandle, directoryName);
  await createMultipleFiles(directoryHandle, fileOptions);
}

/**
 * creates multiple files in a directory
 * @param directoryHandle
 * @param data
 */
async function createMultipleFiles(
  directoryHandle: any,
  data: Array<FileWithContent>
) {
  data.forEach(async (fileOption) => {
    await createFile(directoryHandle, fileOption.name, fileOption.content);
  });
}

/**
 * creates a directory with a single file
 * @param parentHandle
 * @param directoryName
 * @param fileName
 * @param fileContent
 */
async function createDirectoryWithSingleFile(
  parentHandle: any,
  directoryName: string,
  fileName: string,
  fileContent?: string
) {
  const directoryHandle = await createDirectory(parentHandle, directoryName);
  const fileHandle = await createFile(directoryHandle, fileName, fileContent);
  return { directoryHandle, fileHandle };
}

/**
 * Writes into a file with the specified handle
 * @param fileHandle
 * @param contents
 */
async function writeFile(fileHandle: any, contents: string) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
