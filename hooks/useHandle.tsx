import { useError } from "./useError";

export function useHandle() {
    const {handleError} = useError();

    const handle = async (callback:Function) => {
        try {
            await callback();
        } catch (err) {
            handleError(err)
        }
    }

    return {handle}
}