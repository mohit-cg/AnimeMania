import React from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import "swiper/css"
import "swiper/css/pagination"

import "./recommend.css"
import { Lazy } from "swiper"

function RecommendENG({ recommend, setLoading }) {
	return (
		<>
			<h2 className="font-black text-right max-lg:text-center">
				RECOMMENDATIONS
			</h2>
			<div className="mb-[24px]">
				<Swiper
					modules={[Lazy]}
					slidesPerView="auto"
					spaceBetween={10}
					className="recommend-anime-swiper w-full"
					pagination={{
						type: "progressbar",
					}}
					lazy={true}
					preloadImages={false}
				>
					{recommend.map((anime) => (
						<SwiperSlide key={anime.id}>
							<Link
								to={`/eng/info/${anime.id}`}
								title={
									anime.title.english ||
									anime.title.romaji ||
									anime.title.native ||
									anime.title.userPreferred
								}
								onClick={() => setLoading(true)}
								aria-label={
									anime.title.english ||
									anime.title.romaji ||
									anime.title.native ||
									anime.userPreferred
								}
							>
								<div className="group recommend-anime-holder select-none cursor-pointer">
									<div className="recommend-anime-image aspect-[0.7] group-hover:opacity-80 duration-200 ease-in-out relative">
										<img
											className="object-fill object-center w-full h-full group-hover:scale-90 duration-500 linear absolute"
											src={anime.image}
											alt={
												anime.title.english ||
												anime.title.romaji ||
												anime.title.native ||
												anime.title.userPreferred
											}
											loading="lazy"
										/>
										<div className="text-white absolute right-0 bg-[#282828cc] p-[6px]">
											{anime.rating}%{" "}
											<FontAwesomeIcon
												icon={faHeart}
												className="text-red-500"
											/>
										</div>
									</div>
									<div className="recommend-anime-title">
										<p className="text-amber-300 line-clamp-2 font-medium">
											{anime.title.english ||
												anime.title.romaji ||
												anime.title.native ||
												anime.title.userPreferred}
										</p>
									</div>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	)
}

export default RecommendENG
