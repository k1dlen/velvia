"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card(props) {
  return (
    <a className="card max-w-sm overflow-hidden p-3 h-full flex flex-col" href={`/catalog/${props.id}`}>
      <Image
        className="w-full h-auto object-cover border-rounded"
        src={props.image_url}
        alt={props.name}
        width={500}
        height={500}
      />
      <div className="mt-3">
        <h2 className="font-medium font-roboto title text-2xl">{props.name}</h2>
      </div>
      <div className="mt-3">
        <p className="font-roboto font-normal description text-lg">
          {props.description}
        </p>
      </div>
      <div className="mt-auto">
        <p className="font-roboto font-medium price bottom-0 text-2xl">
          ₽ {props.price}
        </p>
      </div>
    </a>
  );
}
