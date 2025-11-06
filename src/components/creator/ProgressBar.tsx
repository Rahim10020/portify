interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-foreground/70">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};