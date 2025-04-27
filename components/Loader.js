// components/Loader.js
export default function Loader() {
    return (
      <div className="loader-overlay">
        <div className="spinner" />
        <style jsx>{`
          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.8);
            z-index: 1000;
          }
          .spinner {
            width: 60px;
            height: 60px;
            border: 6px solid #ccc;
            border-top-color: #333;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
  