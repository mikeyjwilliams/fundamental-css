import del from "del";
import { ctx } from "..";

const clean = async () => {
    await del([ctx.path.root]);
};

export default clean;
require("postcss-url")(
    // inlining requires asset paths to be relative
    inline
);
