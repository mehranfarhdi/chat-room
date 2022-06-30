import {useSelector} from "react-redux";

export const getKey = () => {
    let _secretKey = useSelector(state => state.secretKey);
    return _secretKey;
}
