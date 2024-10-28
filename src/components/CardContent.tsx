import moment from "moment";
import React from 'react';
import { Link } from "react-router-dom";
import { IContent } from '../types';

const noImage = "https://res.cloudinary.com/vegito2448/image/upload/v1718992530/no-image.jpg";

const CardContent: React.FC<IContent> = ({ id, url, createdAt, title, description, createdBy }) => {
  // Truncate description to 50 characters
  const truncatedDescription = description && description.length > 50 ? `${description.substring(0, 50)}...` : 'Without description';

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 shadow-lg rounded m-2 h-max">
      <div className="max-w-[370px] mx-auto mb-8">
        <div className="rounded overflow-hidden mb-8 h-52">
          <img
            src={url || noImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-3">
            {moment(createdAt).format('MMM DD, YYYY')}
          </span>
          <h3>
            <Link
              to={`/content/${id}`}
              className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary"
            >
              {title}
            </Link>
          </h3>
          <p className="text-base text-body-color">
            {truncatedDescription}
          </p>
          <span
            className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5"
          >
            Credits: {createdBy?.username || 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  );
};

export {
  CardContent
};

