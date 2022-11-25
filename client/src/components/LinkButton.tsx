import { Button } from '@mui/material'
import { Link, To } from 'react-router-dom'

type Props = {
  linkto: To
  variant: 'text' | 'outlined' | 'contained' | undefined
  buttontext?: String
  children?: React.ReactNode
} & React.ComponentProps<typeof Button>

const LinkButton = (props: Props) => {
  return (
    <Link
      to={props.linkto}
      style={{
        textDecoration: 'none',
        color: 'black'
      }}
    >
      {props.buttontext ? (
        <Button {...props}>{props.buttontext}</Button>
      ) : (
        <Button variant={props.variant}>{props.children}</Button>
      )}
    </Link>
  )
}

export default LinkButton
