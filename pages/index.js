import React from 'react';
import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline'
import { videoService } from '../src/services/videoService';

function HomePage() {
    const service = videoService()
    const [valorFiltro, setValorFiltro] = React.useState('');
    const [playlists, setPlaylists] = React.useState({})

    // React.useEffect(() => {
    //     service
    //         .getAllVideos()
    //         .then((dados) => {
    //             const novasPlaylists = {};
    //             dados.data.forEach((video) => {
    //                 if(!novasPlaylists[video.playlist]) {
    //                     novasPlaylists[video.playlist] = [];
    //                 }

    //                 novasPlaylists[video.playlist] = [
    //                     video,
    //                     ...novasPlaylists[video.playlist]
    //                 ]
    //             })
                
    //             setPlaylists(novasPlaylists)
    //         })
    // }, [])

    return (
        <>
            <div style={
                {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }
            }>
                <video
                    muted
                    style={
                        {
                            width: "100%",
                            zIndex: "99"
                        }
                    }
                >
                    <source src="./video-teste.mp4" type="video/mp4/" />
                </video>

                <Menu 
                    valorFiltro={valorFiltro}
                    setValorFiltro={setValorFiltro}
                />
                <Header bannerLink={config.bannerLink} />


                <Timeline 
                    searchValue={valorFiltro}
                    playlists={playlists} 
                    favorites={config.favorites}
                >
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// Header

const StyledHeader = styled.div`
    .banner{
        margin-top: 50px;
        width: 100%;
        height: 230px;
        object-fit: cover;
        background-color: #000ca6;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`;

function Header(props) {
    return (
        <StyledHeader>
            <img className='banner' src={props.bannerLink} />
            <section className='user-info'>
                <img className='user-img' src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

// Timeline

function Timeline({searchValue, playlists, favorites}) {
    const playlistNames = Object.keys(playlists);
    const favoritesNames = favorites;

    // Statement x Retorno por expressão

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = playlists[playlistName];

                return (
                    <section key={playlistName} className='videos'>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}

            <section className='favorites'>
                <h2>Favoritos</h2>
                
                <div className='favorites-name'>
                    {favoritesNames.map((favoritesName) => {
                        return (
                            <div key={favoritesName.github}>
                                <img src={`https://github.com/${favoritesName.github}.png`} />
                                <span>{favoritesName.name}</span>
                                <span>@{favoritesName.github}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
        </StyledTimeline>
    )
}
