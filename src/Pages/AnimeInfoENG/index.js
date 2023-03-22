import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import AnimeInfoBannerENG from "../../Components/Content/AnimeInfoBannerENG"
import AnimeInfoBoxENG from "../../Components/Content/AnimeInfoBoxENG"
import AnimeInfoDetailENG from "../../Components/Content/AnimeInfoDetailENG"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { API } from "../../constants"

function AnimeInfoENG() {
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [loadingProvider, setLoadingProvider] = useState(true)
	const [provider, setProvider] = useState("gogoanime")
	const [title, setTitle] = useState("Loading")
	const { animeId } = useParams()
	const [loadingEpisodeList, setLoadingEpisodeList] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getInfo = async () => {
			await axios
				.get(`${API}/eng/info/${animeId}&${provider}`, {
					cancelToken: source.token,
				})
				.then((data) => {
					setTitle(
						data.data.data.title?.english ||
							data.data.data.title?.romaji ||
							data.data.data.title?.native
					)
					setInfo(data.data.data)
					setLoading(false)
					setLoadingEpisodeList(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getInfo()

		return () => {
			source.cancel()
		}
	}, [animeId])

	useDocumentTitle(title)
	return (
		<div className="mb-8">
			<AnimeInfoBannerENG loading={loading} info={info} />
			<div className="w-full flex relative max-lg:flex-col">
				<AnimeInfoBoxENG loading={loading} info={info} />
				<AnimeInfoDetailENG
					loading={loading}
					info={info}
					setProvider={setProvider}
					provider={provider}
					loadingProvider={loadingProvider}
					setLoadingProvider={setLoadingProvider}
					setLoading={setLoading}
					animeId={animeId}
					setInfo={setInfo}
					loadingEpisodeList={loadingEpisodeList}
					setLoadingEpisodeList={setLoadingEpisodeList}
				/>
			</div>
		</div>
	)
}

export default AnimeInfoENG
