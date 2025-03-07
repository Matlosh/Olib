'use client';

import {Button, Card, CardBody, CardHeader, Image} from "@heroui/react";
import Stars from "../stars/stars";
import {excerptString} from "@/app/_utils/reusable";

type BookInfoCardProps = {
  book: BookData
}

export default function BookInfoCard({ book }: BookInfoCardProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 py-8">
      <div className="w-full lg:w-fit flex items-center justify-center">
        <Image
          isBlurred
          alt={book.name}
          src={book.imageUrl.length > 0 ? book.imageUrl : '/images/book-placeholder.webp'}
          width={300}
          height={400}
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <Stars value={book.score} maxValue={100} maxStars={5} />
        <h3 className="text-lg font-bold">{book.name}</h3>
        <p>{book.author}</p>
        <p>ISBN: {book.isbn}</p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button color="default">
            Edit
          </Button>

          <Button color="warning">
            Remove from this shelf
          </Button>

          <Button color="danger">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
