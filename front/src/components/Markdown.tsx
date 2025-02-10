import React from 'react';
import ReactMarkdown from 'react-markdown';

// const Title1: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => {
//     return (
//         <h1 className="text-4xl mb-5 text-center font-bold" {...props}>
//             {children}
//         </h1>
//     );
// };

// const Title2: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => {
//     return (
//         <h2 className="text-2xl font-bold" {...props}>
//             {children}
//         </h2>
//     );
// };

// const Title3: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => {
//     return (
//         <h3 className="text-xl font-bold" {...props}>
//             {children}
//         </h3>
//     );
// };

// const Paragraph: React.FC<React.HTMLProps<HTMLParagraphElement>> = ({ children, ...props }) => {
//     return (
//         <p className="text-lg" {...props}>
//             {children}
//         </p>
//     );
// };

// const List: React.FC<React.HTMLProps<HTMLUListElement>> = ({ children, ...props }) => {
//     return (
//         <ul className="list-disc pl-6" {...props}>
//             {children}
//         </ul>
//     );
// };

// const ListItem: React.FC<React.HTMLProps<HTMLLIElement>> = ({ children, ...props }) => {
//     return (
//         <li className="mb-2" {...props}>
//             - {children}
//         </li>
//     );
// };


// const Image = ({ children, ...props }: { children?: any; }) => {
//     console.log(props);


//     return (
//         <>
//             {children}
//         </>
//     );
// };


const MyMarkdown: React.FC<{ src: string }> = ({ src }) => {
    // const components: Components = {
        // h1: (props) => <Title1 {...props} />,
        // h2: (props) => <Title2 {...props} />,
        // h3: (props) => <Title3 {...props} />,
        // p: (props) => <Paragraph {...props} />,
        // ul: (props) => <List {...props} />,
        // li: (props) => <ListItem {...props} />,
        // img: (props) => <Image {...props} /> 
    // };

    return (
        <ReactMarkdown>
            {src}
        </ReactMarkdown>
    );
};

export default MyMarkdown;
