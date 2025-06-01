// document.getElementById('uploadForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const fileInput = document.getElementById('fileInput');
//     if (!fileInput.files[0]) {
//         alert('Pilih file terlebih dahulu!');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', fileInput.files[0]);

//     try {
//         const response = await fetch('/upload', {
//             method: 'POST',
//             body: formData
//         });
//         const result = await response.json();
//         alert(result.message);
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Gagal mengunggah file');
//     }
// });
