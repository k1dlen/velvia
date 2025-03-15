"use client";

import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({ name, image_url, id }) {
  return (
    <div className="relative overflow-hidden group collectionCard box-border">
      <Link href={`/catalog?type=${name}`} passHref>
        <Image
          className=" h-auto object-cover"
          src={image_url}
          alt={name}
          width={400}
          height={500}
        />
      </Link>
      <div className="bottom-0 left-0 right-0 mt-4 text-start">
        <h3 className="text-2xl font-normal font-roboto flex justify-between items-center overflow-visible uppercase">
          <Link
            href={`/catalog?type=${name}`}
            className="flex justify-between items-center w-full text-2xl"
          >
            <span className="transition-colors collectionCardName">{name}</span>
            <span className="font-semibold accent-color transition-all ease-in-out group-hover:translate-x-2 relative z-10 pr-2">
              &#8594;
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
}
