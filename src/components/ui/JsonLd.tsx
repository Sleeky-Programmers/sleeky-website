const JsonLd = ({ data }: { data: object | object[] }) => (
    <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped cannot break out of the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
);

export default JsonLd;
