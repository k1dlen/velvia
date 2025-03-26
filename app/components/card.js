"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card(props) {
  return (
    <a
      className="flex flex-col h-full max-w-sm p-3 overflow-hidden card"
      href={`/catalog/${props.id}`}
    >
      <Image
        className="object-cover w-full h-auto border-rounded"
        src={props.image_url}
        alt={props.name}
        width={500}
        height={500}
      />
      <div className="mt-3">
        <h2 className="text-2xl font-medium font-roboto title">{props.name}</h2>
      </div>
      <div className="mt-3">
        <p className="text-lg font-normal font-roboto description">
          {props.description}
        </p>
      </div>
      <div className="mt-auto">
        <p className="bottom-0 text-2xl font-medium font-roboto price">
          {props.discount ? (
            <>
              <span className="text-gray-600 line-through">
                ₽ {props.price}
              </span>{" "}
              <span className="text-red-600">
                ₽{" "}
                {(
                  props.price -
                  (props.price * props.discount) / 100
                ).toFixed(2)}
              </span>
            </>
          ) : (
            <span>₽ {props.price}</span>
          )}
        </p>
      </div>
    </a>
  );
}
