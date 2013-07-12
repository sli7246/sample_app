class AppointmentMailer < ActionMailer::Base
  default from: 'notifications@whizium.com'
  
  def appointment_proposal(proposer, target)
    mail(:to => "#{target.name} <#{target.email}>", :subject => "#{proposer.name} would like to speak with you")
  end
end
