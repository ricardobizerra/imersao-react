import React from "react";

export const ColorModeContext = React.createContext({
    mode: '',
    setMode: () => { alert('me configure.') },
    toggleMode: () => { alert('me configure.') }
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        if (mode === 'dark') setMode('light');
        if (mode === 'light') setMode('dark');
    }

    return (
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    )
}