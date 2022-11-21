import { Button } from '@mui/material'
import { Link, To } from 'react-router-dom'

type Props = {
  linkTo: To
  variant: 'text' | 'outlined' | 'contained' | undefined
  buttonText?: String
  children?: React.ReactNode
} & React.ComponentProps<typeof Button>

const LinkButton = (props: Props) => {
  return (
    <Link
      to={props.linkTo}
      style={{
        textDecoration: 'none',
        color: 'black'
      }}
    >
      {props.buttonText ? (
        <Button {...props}>{props.buttonText}</Button>
      ) : (
        <Button variant={props.variant}>{props.children}</Button>
      )}
    </Link>
  )
}

export default LinkButton
