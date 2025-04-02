"use client"
import React, { useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/Pagination/Pagination";
import { X, Download, Heart } from "lucide-react";

// Sample data (replace with data from your API/database)
const files = [
  {
    id: 1,
    title: "Document Title 1",
    author: "Author 1",
    image: "/icons/ebook.png",
    status: "ACCEPTEE", // File status
    payment: "Paid",
    uploadDate: "2025-04-02",
    url: "https://example.com/file1.pdf",
    isDownloadable: true,
    type: "PDF",
    description: "This is a detailed description of the document.",
    isFavorite: false, // New field to manage favorite status
  },
  // Add other files...
];

const DashboardPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesData, setFilesData] = useState(files); // State to manage the list of files

  // Function to handle row click (opens the modal and populates it with the file data)
  const handleRowClick = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Function to handle toggling the favorite status
  const toggleFavorite = (fileId) => {
    const updatedFiles = filesData.map((file) =>
      file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file
    );
    setFilesData(updatedFiles);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">Document</th>
                  <th scope="col" className="px-6 py-3">Author</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {filesData.map((file) => (
                  <tr key={file.id} onClick={() => handleRowClick(file)} className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                          src={file.image}
                          fill
                          sizes="80px"
                          alt="file"
                        />
                        <div className="ms-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold dark:text-neutral-300">{file.title}</h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">{file.author}</td>
                    <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">{file.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <a
                        href={file.url}
                        className={`text-primary-800 dark:text-primary-500 hover:text-primary-900 ${!file.isDownloadable ? "pointer-events-none opacity-50" : ""}`}
                      >
                        {file.isDownloadable ? "Download" : "View"}
                      </a>
                      {` | `}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the row click event
                          toggleFavorite(file.id); // Toggle favorite status
                        }}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        {/* Heart Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={file.isFavorite ? "red" : "none"}
                          stroke="currentColor"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />

      {/* Modal for showing detailed information */}
      {isModalOpen && selectedFile && <FileDetailsModal file={selectedFile} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DashboardPosts;

const FileDetailsModal = ({ file, onClose, toggleFavorite }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        {/* File Thumbnail & Title */}
        <div className="flex flex-col items-center text-center">
          <NcImage
            src={getFileImage(file.type)}
            width={80}
            height={80}
            className="rounded-lg"
          />


          <h2 className="text-xl font-semibold mt-3">{file.title}</h2>
          <p className="text-sm text-gray-500">{file.author}</p>
        </div>

        {/* File Details */}
        <div className="mt-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Statut:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              file.status === "Disponible" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
            }`}>
              {file.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">{file.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ajouté le:</span>
            <span className="font-medium">{file.uploadDate}</span>
          </div>
          {file.description && (
            <div className="mt-2">
              <span className="text-gray-600 block mb-1">Description:</span>
              <p className="text-gray-500 text-sm bg-gray-100 p-3 rounded">{file.description}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <a
            href={file.url}
            className={`flex-1 flex items-center justify-center px-4 py-2 text-white rounded-lg ${
              file.isDownloadable ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <Download size={20} className="mr-2" />
            Télécharger
          </a>

          <button
            onClick={() => toggleFavorite(file.id)}
            className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <Heart fill={file.isFavorite ? "white" : "none"} size={20} className="mr-2" />
            Favori
          </button>
        </div>
      </div>
    </div>
  );
};

const getFileImage = (fileType) => {
  const images = {
    pdf: "/icons/pdf.png",
    ebook: "/icons/ebook.png",
    doc: "/icons/doc.png",
    xls: "/icons/xls.png",
    ppt: "/icons/ppt.png",
    txt: "/icons/txt.png",
    audio: "/icons/audio.png",
    video: "/icons/video.png",
    default: "/icons/default.png",
  };

  return images[fileType.toLowerCase()] || images.default;
};
