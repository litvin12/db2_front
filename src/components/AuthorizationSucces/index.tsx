import styles from './styles.module.scss'
type AuthorizationSuccesProps = {
    onClickClose: () => void
}
export const AuthorizationSucces = ({ onClickClose }: AuthorizationSuccesProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.content}>
                <h1>Вы успешно авторизованы!</h1>
                <button onClick={onClickClose}>OK</button>
                </div>
            </div>
        </div>
    )
}