interface PersonaProps {
    name: string;
    generation: string;
}

const Persona = ({ name, generation }: PersonaProps) => {
    return (
        <section className="flex gap-[0.125rem] px-1 py-3">
            <span className="text-gray-600">{generation}기</span>
            <strong className="font-bold text-gray-900">{name}</strong>
            <span className="text-gray-600">님 안녕하세요.</span>
        </section>
    );
};

export default Persona;
