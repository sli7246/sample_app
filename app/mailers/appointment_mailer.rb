class AppointmentMailer < ActionMailer::Base
  def appointment_proposal(proposer, target)
    mail(:to => target.email, :subject => "#{target.name} would like to speak with you")
  end
end
