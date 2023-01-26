import { useField } from "../hooks";

const AnecdoteForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: author.value,
            votes: 0
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content.bindingAttrs} />
                </div>
                <div>
                    author
                    <input name='content' {...author.bindingAttrs} />
                </div>
                <div>
                    url for more info
                    <input name='content' {...info.bindingAttrs} />
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default AnecdoteForm