import config from '../config.json';
import styled from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {    
    return (
        <>
            <CSSReset />
            <div style={
                {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }
            }>
                <Menu />
                <Header bannerLink={config.bannerLink} />
                <Timeline playlists={config.playlists} favorites={config.favorites}>
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

function Timeline(props) {
    const playlistNames = Object.keys(props.playlists);
    const favoritesNames = props.favorites

    // Statement x Retorno por expressão

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section className='videos'>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}

            <section className='favorites'>
                <h2>Favoritos</h2>
                
                <div className='favorites-name'>
                    {favoritesNames.map((favoritesName) => {
                        const favorites = props.favorites[favoritesName];

                        return (
                            <div>
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
