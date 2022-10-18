import EventItem from '../events/EventItem'
import classes from './comment-list.module.css'

export default function CommentList(props){

    const {items} = props
     return <ul className={classes.comments}>{
        items.map((comment)=><li key={comment.id}><p>{comment.comment}</p><div>By <address>{comment.name}</address></div></li>)
     }</ul>
}