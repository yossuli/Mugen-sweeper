import { useRouter } from 'next/router';
import { useController } from 'src/Hooks/useController';
import GameDisplay from 'src/components/GameDisplay/GameDisplay';
import { GameOver } from 'src/components/GameOver/GameOver';
import { Loading } from 'src/components/Loading/Loading';
import LoginModal from 'src/components/LoginModal/LoginModal';
import type { ActionModel } from 'src/types/types';
import { isFailed } from 'src/utils/isFailed';
import styles from './index.module.css';

const arrowTexts = ['', '▲', '', '◀', '', '▶', '', '▼', ''];

const actions: ActionModel[] = ['ul', 'up', 'ur', 'left', 'middle', 'right', 'dl', 'down', 'dr'];

const Controller = () => {
  const router = useRouter();
  const playerIdStr = typeof router.query.playerId === 'string' ? router.query.playerId : null;
  const controller = useController(playerIdStr);
  if (playerIdStr === null) {
    return <LoginModal />;
  }
  if (controller === null) {
    return <Loading visible />;
  }
  const { board, player, clickButton, transform, dir, displayPos, flag, dig } = controller;

  return (
    <div className={styles.controller}>
      {isFailed(board) && <GameOver userId={player.id} />}
      <div className={styles.moveButton}>
        {actions.map((action, i) => (
          <button key={i} onClick={() => clickButton(action)} className={styles.button}>
            {arrowTexts[i]}
          </button>
        ))}
      </div>
      <GameDisplay
        transform={transform}
        dir={dir}
        board={board}
        player={player}
        displayPos={displayPos}
      />
      <button className={`${styles.button} ${styles.flagButton}`} onClick={flag}>
        🚩
      </button>
      <button className={`${styles.button} ${styles.openButton}`} onClick={dig}>
        ⛏️
      </button>
    </div>
  );
};

export default Controller;
