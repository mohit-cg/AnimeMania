import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsFillPlayFill } from "react-icons/bs"
import AnimeSkeleton from "../AnimeSkeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"

import SwiperCore, { Pagination, Lazy } from "swiper"
SwiperCore.use([Pagination, Lazy])

function MostWatched({ rankToday, done2 }) {
	return (
		<>
			{!done2 ? (
				<AnimeSkeleton />
			) : (
				<Swiper
					spaceBetween={10}
					slidesPerView="auto"
					className="homeSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
					preloadImages={false}
					lazy={true}
				>
					{rankToday.map((anime) => (
						<SwiperSlide key={anime?.slug} className="w-[320px]">
							<nav>
								<Link
									to={`info/${anime?.slug}`}
									title={anime?.name}
									aria-label={anime?.name}
								>
									<Card>
										<div className="card-container">
											<Card.Img
												variant="top"
												src={anime.thumbnail}
												loading="lazy"
												alt={anime.name}
											/>
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>

										<Card.Body className="h-[100px]">
											<Card.Title>
												<p className="webclamp text-orange-50">{anime?.name}</p>
											</Card.Title>
										</Card.Body>
									</Card>
								</Link>
							</nav>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	)
}

export default MostWatched
