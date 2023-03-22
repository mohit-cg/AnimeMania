import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { GENRES } from "../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import LoadingSpin from "react-loading-spin"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../../Hooks/useDocumentTitle"

const PAGE_NUMBER = 1

function AnimeGenre({ instance }) {
	const { genre } = useParams()

	const [animeList, setAnimeList] = useState([])
	const [genreAnime, setGenreAnime] = useState("")
	const [page, setPage] = useState(PAGE_NUMBER)
	const [totalPage, setTotalPage] = useState(true)
	const [translateGenreAnime, setTranslateGenreAnime] = useState("")
	const [loading, setLoading] = useState(true)

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const translateGenre = () => {
			for (let i = 0; i < GENRES.length; i++) {
				if (genreAnime === GENRES[i].slug) {
					setTranslateGenreAnime(GENRES[i].name)
				}
			}
		}

		if (genre === genreAnime) {
			const getList = async () => {
				await instance
					.get(`/anime/${genre}?page=${page}`, {
						cancelToken: source.token,
					})
					.then((response) => {
						if (response.data.success) {
							const newList = response.data.data.map((anime) => ({
								slug: anime.slug,
								thumbnail: anime.thumbnail,
								name: anime.name,
								views: anime.views,
							}))
							setTotalPage(response.data.pagination.totalPage)
							setAnimeList((prev) => {
								return [...new Set([...prev, ...newList])]
							})
							setLoading(false)
						}
					})
					.catch((thrown) => {
						if (axios.isCancel(thrown)) return
					})
			}
			getList()
			translateGenre()
		} else {
			setPage(1)
			setAnimeList([])
			setGenreAnime(genre)
		}

		return () => {
			source.cancel()
		}
	}, [genreAnime, genre, page, instance])

	return (
		<>
			<div>
				<h1 className="font-black">ANIME {translateGenreAnime}</h1>
				{useDocumentTitle(`Thể loại ${translateGenreAnime} - Unime`)}
			</div>
			<div className="anime-list pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
				{loading ? (
					<div className="loading-spin w-full text-center">
						<LoadingSpin primaryColor="red" />
					</div>
				) : (
					<InfiniteScroll
						initialScrollY={0}
						style={{ overflow: "none" }}
						dataLength={animeList.length}
						scrollThreshold={0.9}
						next={scrollThreshold}
						hasMore={page === totalPage ? false : true}
						loader={
							<div className="loading-spin">
								<LoadingSpin primaryColor="red" />
							</div>
						}
					>
						<Row
							xs={1}
							sm={2}
							md={3}
							lg={4}
							className="w-full w-full row-anime pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32"
						>
							{animeList.map((anime) => (
								<Col key={anime?.slug}>
									<nav>
										<Link to={`/info/${anime?.slug}`} aria-label={anime?.name}>
											<Card title={anime?.name}>
												<div className="card-container">
													<Card.Img
														variant="top"
														src={anime?.thumbnail}
														fluid="true"
														loading="lazy"
														alt={anime?.name}
													/>
													<div className="overlay-card">
														<div className="icon">
															{<BsFillPlayFill size={40} />}
														</div>
													</div>
												</div>
												<Card.Body>
													<Card.Title>
														<p className="webclamp">{anime?.name}</p>
													</Card.Title>
												</Card.Body>
											</Card>
										</Link>
									</nav>
									<div className="w-full"></div>
								</Col>
							))}
						</Row>
					</InfiniteScroll>
				)}
			</div>
		</>
	)
}

export default AnimeGenre
