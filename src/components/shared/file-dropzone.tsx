import React, { useState } from "react";
import { Group, Text, rem, Image, LoadingOverlay, Box } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { env } from "@/env";
import crypto from "crypto";

interface Props extends Partial<DropzoneProps> {
  description?: string;
  value: string;
  folder: string;
}

const generateSignature = (
  timestamp: number,
  apiSecret: string,
  folder?: string
) => {
  const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash("sha1").update(stringToSign).digest("hex");
};

const uploadSingleImage = async (
  file: File,
  folder: string,
  timestamp: number,
  signature: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  formData.append("signature", signature);
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_API_NAME}/image/upload`, // Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("data => ", data);
    return data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

const uploadToCloudinary = async (files: File[], folder = "my_uploads") => {
  const timestamp = Date.now();
  const signature = generateSignature(
    timestamp,
    env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    folder
  );

  try {
    const uploadPromises = files.map((file) =>
      uploadSingleImage(file, folder, timestamp, signature)
    );
    const results = await Promise.all(uploadPromises);
    console.log("Upload results: ", results);
    return results;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default function FileDropzone({
  description = "Attach as many files as you like, each file should not exceed 5mb",
  onChange,
  folder = "unkwon",
  ...props
}: Props) {
  const [uploading, setUploading] = useState<boolean>(false);

  const handleDrop = async (files: File[]) => {
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(files, folder);
      if (onChange) onChange(uploadedUrl as any);
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={uploading} overlayProps={{ blur: 2 }} />

      <Dropzone
        onDrop={handleDrop}
        onReject={(rejectedFiles) =>
          console.log("rejected files", rejectedFiles)
        }
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="border border-dashed border-gray-300 rounded-md"
        {...props}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          {props.value ? (
            <Image
              src={props.value}
              alt="Cover image"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
          ) : (
            <>
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
              <div>
                <Text size="xl" inline>
                  {props.title}
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  {description}
                </Text>
              </div>
            </>
          )}
        </Group>
      </Dropzone>
    </Box>
  );
}
