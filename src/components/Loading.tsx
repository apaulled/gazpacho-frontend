import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import '../style/components/Loading.scss';

const Loading: React.FC = () => {
    return (
        <CircularProgress className="loading-indicator" size={24} thickness={5}/>
    )
}

export default Loading;