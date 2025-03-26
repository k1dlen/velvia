"use client";

import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({ name, image_url, id }) {
  return (
    <div className="box-border relative overflow-hidden group collectionCard">
      <Link href={`/catalog?type=${name}`} passHref>
        <Image
          className="object-cover h-auto "
          src={image_url}
          alt={name}
          width={400}
          height={500}
        />
      </Link>
      <div className="bottom-0 left-0 right-0 mt-4 text-start">
        <h3 className="flex items-center justify-between overflow-visible text-2xl font-normal uppercase font-roboto">
          <Link
            href={`/catalog?type=${name}`}
            className="flex items-center justify-between w-full text-2xl"
          >
            <span className="transition-colors collectionCardName">{name}</span>
            <span className="relative z-10 pr-2 font-semibold transition-all ease-in-out accent-color group-hover:translate-x-2">
              &#8594;
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
}
