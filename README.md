# ⚒️ Smyth.js | File Handling Utility
The goal is to create a package that acts as a micro-service for any sort of application running javascript, either on the front-end or back-end (or both!).

## Features

- **File Upload**: Upload images to the microservice.
- **Image Processing**: Process images using various techniques.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd file-handling-microservice
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the microservice**:
   ```
   npm run dev
   ```

## Usage

- Use the HTTP interface to upload and retrieve images.

## Architecture

This microservice is built using a hexagonal architecture, which promotes a clear separation between the core business logic and external systems. The application is divided into several layers:

- **Application Layer**: Contains services and ports for file handling operations.
- **Domain Layer**: Defines the core models used in the application.
- **Infrastructure Layer**: Implements the storage, processing, and retrieval mechanisms.
- **Interface Layer**: Provides HTTP (for now) for user interaction.

## License

This project is licensed under the MIT License. See the LICENSE file for details.