import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm() {
            setValues({});
        }
    }
}

const PROJECT_URL = 'https://whslhhnsbdgiwkoyadaq.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2xoaG5zYmRnaXdrb3lhZGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODYzNzksImV4cCI6MTk4Mzk2MjM3OX0.-9Kaeu8_iFrU_aiOXRFn51jPaUvCfSfFVEP_-TP3Ny4'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {
            titulo: 'aobabiwbvworbo',
            url: 'ncowibiveonriodotcom'
        }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel

                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();

                        supabase.from('video').insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: 'jogos',
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button 
                            type="button"
                                className="close-modal" 
                                onClick={() => setFormVisivel(false)}
                            >
                                X
                            </button>
                            <input 
                                placeholder="Título do vídeo" 
                                name="titulo"
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange}
                            />
                            <input 
                                placeholder="URL" 
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )

                : false
            }
        </StyledRegisterVideo>
    )
}