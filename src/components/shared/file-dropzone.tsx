import React, { useState } from "react";
import { Group, Text, rem, Image, LoadingOverlay, Box } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

interface Props extends Partial<DropzoneProps> {
  description?: string;
  value: string;
}

export default function FileDropzone({
  description = "Attach as many files as you like, each file should not exceed 5mb",
  onChange,
  ...props
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        alt={`Preview ${index}`}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
      />
    );
  });

  const uploadToCloudinary = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleDrop = async (files: File[]) => {
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(files);
      if (onChange) onChange(uploadedUrl);
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
