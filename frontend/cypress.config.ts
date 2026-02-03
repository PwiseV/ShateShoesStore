import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: true, // Đảm bảo dòng này là true
    videoCompression: 32, // Tùy chọn: nén video (0-51, số càng cao video càng mờ nhưng dung lượng nhẹ)
    videosFolder: "cypress/reports/videos",
    baseUrl: "https://shate-shoes-store.vercel.app",
    supportFile: false, // Để đơn giản hóa nếu bạn chưa cần dùng support file
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  // Giữ lại component nếu bạn vẫn muốn test lẻ từng file UI
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
