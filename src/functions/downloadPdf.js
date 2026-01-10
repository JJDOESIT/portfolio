// Function to download a file given a path to a public URL
export default async function downloadFile(title, path) {
  try {
    // Fetch the file
    const response = await fetch(path);

    // If the fetch failed
    if (!response.ok) {
      throw new Error("File not found or failed to fetch");
    }
    // Convert the file into a blob
    const fileBlob = await response.blob();

    // Create a new Blob with 'application/octet-stream' MIME type
    const octetStreamBlob = new Blob([fileBlob], {
      type: "application/octet-stream",
    });

    // Create an object URL for the Blob
    const url = URL.createObjectURL(octetStreamBlob);

    // Create a temporary <a> element
    const a = document.createElement("a");
    // Set the download URL
    a.href = url;
    // Specify the filename for the downloaded file
    a.download = title;
    // Trigger the download by clicking the link programmatically
    document.body.appendChild(a);
    a.click();
    // Remove the link after the download
    document.body.removeChild(a);
    // Revoke the object URL after the download is triggered
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
}
