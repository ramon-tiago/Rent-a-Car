import fs from "fs";

export const deleteFile = async(fileName) => {
    try {
        await fs.promises.stat(fileName)
    } catch (err) {
        return;
    }

    await fs.promises.unlink(fileName);
};