export function KazakhOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2">
        <path d="M120 15 145 40 120 65 95 40 120 15Z" />
        <path d="M120 175 145 200 120 225 95 200 120 175Z" />
        <path d="m15 120 25-25 25 25-25 25-25-25Z" />
        <path d="m175 120 25-25 25 25-25 25-25-25Z" />
        <path d="M67 67h38v38H67V67Zm68 0h38v38h-38V67ZM67 135h38v38H67v-38Zm68 0h38v38h-38v-38Z" />
        <path d="M105 86h30M86 105v30m68-30v30m-49 19h30" />
        <path d="m105 105 15-15 15 15-15 15-15-15Zm0 30 15-15 15 15-15 15-15-15Z" />
        <path d="M40 40h27v27H40V40Zm133 0h27v27h-27V40ZM40 173h27v27H40v-27Zm133 0h27v27h-27v-27Z" />
      </g>
    </svg>
  );
}
