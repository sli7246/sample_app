class AppointmentMailer < ActionMailer::Base
  default from: 'notifications@whizium.com'
  
  def appointment_proposal(proposer, target)
    @target = target
    @proposer = proposer
    
    mail(:to => "#{@target.name} <#{@target.email}>", :subject => "#{@proposer.name} would like to speak with you")
  end
  
  def appointment_confirmation(proposer, target, appointment)
    @target = target
    @proposer = proposer
    
    if @target.time_zone.nil?
      @appointment_time = appointment.display_app_date_time(appointment.app_date_time, 'UTC')  
    else
      @appointment_time = appointment.display_app_date_time(appointment.app_date_time, @target.time_zone)  
    end
    
    mail(:to => "#{@target.name} <#{@target.email}>", :subject => "Congratulations! Your appointment with #{@proposer.name} has been booked!")
  end
end
