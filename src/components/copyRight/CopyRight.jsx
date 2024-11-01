import Link from "next/link";

const CopyRight = () => {
  return (
    <div className="flex justify-between absolute bottom-0 left-0 right-0 px-20 pb-8 w-11/ mx-auto">
      <p className="text-xs text-[#9E9E9E] font-normal">
        Copyright 2024 TPS Pakistan. All rights Reserved
      </p>
      <Link href="#" className="text-xs text-[#424242] font-normal">
        Need help?
      </Link>
    </div>
  );
};


export default CopyRight;