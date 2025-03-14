import "./check-animation.css";

export default function CheckAnimation() {
    return (
        <svg
            width="115"
            // length="115px"
            height="115"
            viewBox="0 0 133 133"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <g
                id="check-group"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <circle
                    id="filled-circle"
                    fill="#07b481"
                    cx="66.5"
                    cy="66.5"
                    r="54.5"
                />
                <circle
                    id="white-circle"
                    fill="#FFFFFF"
                    cx="66.5"
                    cy="66.5"
                    r="55.5"
                />
                <circle
                    id="outline"
                    stroke="#07b481"
                    strokeWidth="4"
                    cx="66.5"
                    cy="66.5"
                    r="54.5"
                />
                <polyline
                    id="check"
                    stroke="#FFFFFF"
                    strokeWidth="5.5"
                    points="41 70 56 85 92 49"
                />
            </g>
        </svg>
    );
}