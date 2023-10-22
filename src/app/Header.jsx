import Image from 'next/image'

export default function desciption(){
    return (
        <header>
            <div>
                <Image src="/PromptBuilder.png" width={1000} height={200}/>
            </div>
            <div>
                <p>Prompt Builder is a quick and easy to use learning tool that allows students<br></br>to query learning material and creates prompts that will aid in expanding their learning</p>
            </div>
        </header>
    )
}