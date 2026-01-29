
export type Form = {
    totalTime: number;
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
}

type PomodoroFormProps = {
    formState: Form;
    setFormState: React.Dispatch<React.SetStateAction<Form>>;
}



const PomodoroForm = ({ formState, setFormState }: PomodoroFormProps) => {
    const updateFormState = (field: keyof Form, value: string) => {
        setFormState({
            ...formState,
            [field]: Number(value),
        });
    }
    return (
        <>
            <div>
                <button>-</button>
                <input
                    type="number"
                    value={formState.totalTime}
                    onChange={e => updateFormState('totalTime', e.target.value)}
                />
                <button>+</button>
            </div>
            <div>
                <button>-</button>
                <input
                    type="number"
                    value={formState.pomodoroTime}
                    onChange={e => updateFormState('pomodoroTime', e.target.value)}
                />
                <button>+</button>
            </div>
            <div>
                <button>-</button>
                <input
                    type="number"
                    value={formState.shortBreakTime}
                    onChange={e => updateFormState('shortBreakTime', e.target.value)}
                />
                <button>+</button>
            </div>
            <div>
                <button>-</button>
                <input
                    type="number"
                    value={formState.longBreakTime}
                    onChange={e => updateFormState('longBreakTime', e.target.value)}
                />
                <button>+</button>
            </div>
        </>
    )
}

export default PomodoroForm;