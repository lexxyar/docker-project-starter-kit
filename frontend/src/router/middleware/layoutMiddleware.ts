import { type RouteLocationNormalized } from "vue-router"

export async function layoutMiddleware(to: RouteLocationNormalized) {
    try {
        let layout = to.meta.layout || "GuestLayout"

        let layoutComponent = await import(`../../layouts/${layout}.vue`)
        to.meta.layoutComponent = layoutComponent.default
    } catch (e) {
        console.error("Error occurred in processing of layouts: ", e)
        console.log("Mounted DefaultLayout")
        let layout = "GuestLayout";
        let layoutComponent = await import(`../../layouts/${layout}.vue`)
        to.meta.layoutComponent = layoutComponent.default
    }
}
