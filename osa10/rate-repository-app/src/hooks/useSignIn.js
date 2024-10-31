import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const mut = await mutate({ variables: { credentials: { username, password } }});
        return mut;
    };

    return [signIn, result];
};

export default useSignIn;