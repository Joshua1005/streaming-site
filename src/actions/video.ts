"use server";

async function uploadFile(file: File) {
  try {
    const { type, name, size } = file;

    console.log(type);
  } catch (error) {}
}

export { uploadFile };
