// "use client"

// import { Bell, Package, ShoppingCart, Users, LineChart, Menu } from "lucide-react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Home, Package2 } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


// export function NavBar() {
//     const classNameSelected = "flex mx-[-0.65rem] items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
//     const classNameNormal = "flex mx-[-0.65rem] items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

//     return (
//         <div className="flex h-full max-h-screen flex-col gap-2 font-medium">
//             <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//                 <Link href="/" className="flex items-center gap-2 font-semibold">
//                     <Package2 className="h-6 w-6" />
//                     <span className="">Acme Inc</span>
//                 </Link>
//                 <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//                     <Bell className="h-4 w-4" />
//                     <span className="sr-only">Toggle notifications</span>
//                 </Button>
//             </div>
//             <div className="flex-1">
//                 <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//                     <Link href="#" className={classNameNormal}>
//                         <Home className="h-4 w-4" />
//                         Dashboard
//                     </Link>
//                     <Link href="#" className={classNameSelected}>
//                         <ShoppingCart className="h-4 w-4" />
//                         Orders
//                     </Link>
//                     <Link href="#" className={classNameNormal}>
//                         <Package className="h-4 w-4" />
//                         Products{" "}
//                     </Link>
//                     <Link href="#" className={classNameNormal}>
//                         <Users className="h-4 w-4" />
//                         Customers
//                     </Link>
//                     <Link href="#" className={classNameNormal}>
//                         <LineChart className="h-4 w-4" />
//                         Analytics
//                     </Link>
//                 </nav>
//             </div>
//             <div className="mt-auto p-4">
//                 <Card x-chunk="dashboard-02-chunk-0">
//                     <CardHeader className="p-2 pt-0 md:p-4">
//                         <CardTitle>Upgrade to Pro</CardTitle>
//                         <CardDescription>
//                             Unlock all features and get unlimited access to our support
//                             team.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
//                         <Button size="sm" className="w-full">
//                             Upgrade
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }

// export const NavBarBurgerMenu = () => {
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button variant="outline" size="icon" className="shrink-0 md:hidden">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col">
//                 <NavBar />
//             </SheetContent>
//         </Sheet>
//     )
// }
