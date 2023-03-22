/* eslint-disable jsx-a11y/alt-text */
import Skeleton from "@mui/material/Skeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import SwiperCore, { Lazy } from "swiper"
SwiperCore.use([Lazy])

function CharacterDetail({ randomAnime, done3 }) {
	return (
		<>
			<div className="character-detail mt-[42px]">
				{!done3 ? (
					<Skeleton
						variant="rectangular"
						width="100%"
						style={{
							height: "300px",
							width: "auto",
						}}
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
					/>
				) : (
					<>
						{!randomAnime?.characters?.length ? (
							""
						) : (
							<Swiper
								slidesPerView="auto"
								spaceBetween={30}
								loop={true}
								grabCursor={true}
								className="character-slider"
								preloadImages={false}
								lazy={true}
							>
								{randomAnime.characters.map((character, i) => (
									<SwiperSlide
										className="w-[100px] flex flex-col justify-center items-center flex flex-col text-[#42EADDFF]"
										key={i}
									>
										<div className="h-full">
											<img
												className="aspect-[2/3] object-cover"
												src={character.image}
												loading="lazy"
												alt={character.name.full}
											/>
										</div>
										<p className="line-clamp-2 block w-full text-left">
											{character.name.full}
										</p>
									</SwiperSlide>
								))}
								<h3 className="block text-left max-md:text-center character-title color-[#fffc] font-bold select-none my-[6px]">
									DÀN NHÂN VẬT
								</h3>
							</Swiper>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default CharacterDetail
